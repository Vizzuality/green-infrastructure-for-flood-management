import L from 'leaflet/dist/leaflet';
import { PruneCluster, PruneClusterForLeaflet } from 'lib/PruneCluster';
import { push } from 'react-router-redux';
import { dispatch } from 'main';

PruneCluster.Cluster.ENABLE_MARKERS_LIST = true;

function getPopupMarkup(data) {
  const orgs = `${data.organizations[0].name} ${data.organizations.length > 1 ? `<span class="c-plus-number -right"}>+${data.organizations.length - 1}</span>` : ''}`;
  const hazards = `${data.hazard_types[0].name} ${data.hazard_types.length > 1 ? `<span class="c-plus-number -right"}>+${data.hazard_types.length - 1}</span>` : ''}`;
  const url = `/map/project/${data.id}`;

  const myPopup = L.DomUtil.create('div', 'infoWindow');
  myPopup.innerHTML = `
    <div class="c-tooltip">
      <div class="tooltip-content">
        <div class="project-name">${data.name}</div>
        <div class="project-orgs">${orgs}</div>
        <div class="project-hazards">${hazards}</div>
      </div>
      <a class="tooltip-link">More info</a>
    </div>
  `;

  myPopup.querySelector('a').addEventListener('click', () => dispatch(push(url)));

  return myPopup;
}

function getMarkers(props) {
  const { projectDetail } = props;

  /* Project centroid marker icon */
  function PrepareLeafletMarker(leafletMarker, data) {
    let className = 'c-marker';
    let iconSize = [20, 20];
    if (data.current) {
      className += ' -current';
      iconSize = [6, 6];
    }
    if (data.centroid) {
      className += ' -centroid';
    }

    leafletMarker.setIcon(L.divIcon({
      iconSize,
      className,
      html: '<div class="marker-inner"></div>'
    }));

    if (data.centroid) {
      // Bind Popup
      leafletMarker.bindPopup(getPopupMarkup(data));
      // Set listeners
      leafletMarker.off('click').on('click', function mouseover() {
        this.openPopup();
      });
    }
  }

  /* Cluster */
  function BuildLeafletClusterIcon(cluster) {
    const size = 15 + ((cluster.population * 100) ** 0.5);
    /* Cluster icon */
    const icon = L.divIcon({
      iconSize: [size, size],
      className: 'c-marker',
      html: `<div class="marker-inner">${cluster.population}</div>`
    });

    return icon;
  }

  function BuildLeafletCluster(cluster, position) {
    const icon = BuildLeafletClusterIcon(cluster);
    const marker = new L.Marker(position, { icon });
    const pruneCluster = this;

    marker.on('click', () => {
      /* Fitbounds width sidebar width padding */
      const markersArea = pruneCluster.Cluster.FindMarkersInArea(cluster.bounds);
      const b = pruneCluster.Cluster.ComputeBounds(markersArea);

      if (b) {
        const bounds = new L.LatLngBounds(
          new L.LatLng(b.minLat, b.maxLng),
          new L.LatLng(b.maxLat, b.minLng));

        const zoomLevelBefore = pruneCluster._map.getZoom();
        const zoomLevelAfter = pruneCluster._map.getBoundsZoom(bounds, false, new L.Point(20, 20, null));

        if (zoomLevelAfter === zoomLevelBefore) {
          pruneCluster._map.fire('overlappingmarkers', {
            cluster: pruneCluster,
            markers: markersArea,
            center: marker.getLatLng(),
            marker
          });
        } else {
          // We should check if the sidebar is opened
          const sidebarWidth = props.sidebarWidth + 25;
          pruneCluster._map.fitBounds(bounds, {
            // maxZoom: pruneCluster._map.getZoom() + 2,
            paddingTopLeft: [sidebarWidth, 25],
            paddingBottomRight: [50, 25]
          });
        }
      }
    });

    return marker;
  }

  // Create a cluster for each country
  let projectLocations = [];
  let pruneClusterDetailMarker;

  const pruneClusterMarker = new PruneClusterForLeaflet(60);
  pruneClusterMarker.PrepareLeafletMarker = PrepareLeafletMarker;
  pruneClusterMarker.BuildLeafletCluster = BuildLeafletCluster;
  pruneClusterMarker.BuildLeafletClusterIcon = BuildLeafletClusterIcon;

  props.projects.forEach((project) => {
    // Push all project locations to projectLocations
    projectLocations = project.locations.map((location) => {
      const lat = location.centroid.coordinates[1];
      const lng = location.centroid.coordinates[0];
      return [lat, lng];
    });

    // Get centroid from projectLocations and add it to cluster
    if (projectLocations.length) {
      const centroid = L.latLngBounds(projectLocations).getCenter();
      let marker = new PruneCluster.Marker(centroid.lat, centroid.lng);

      // Push project detail centroid into another different cluster
      if (projectDetail && (projectDetail.id === project.id)) {
        // Detail project
        pruneClusterDetailMarker = new PruneClusterForLeaflet(1);
        pruneClusterDetailMarker.PrepareLeafletMarker = PrepareLeafletMarker;
        pruneClusterDetailMarker.BuildLeafletCluster = BuildLeafletCluster;
        pruneClusterDetailMarker.BuildLeafletClusterIcon = BuildLeafletClusterIcon;
        marker.data = { ...project, centroid };
        pruneClusterDetailMarker.RegisterMarker(marker);

        // Avoid adding project points if there is just one location
        if (!(projectLocations.length === 1 && projectLocations[0][1] === centroid.lat && projectLocations[0][0] === centroid.lng)) {
          projectLocations.forEach((location) => {
            // const offset = 0.005;
            const offset = 0; // Offset for correct centering marker on line
            marker = new PruneCluster.Marker(location[0] - offset, location[1] + offset);
            marker.data = { ...project, current: true };
            pruneClusterDetailMarker.RegisterMarker(marker);

            // Connect point to centroid with a line
            const line = L.polyline([centroid, location], {
              color: '#FFB400',
              weight: 2
            });
            line.addTo(window.__map__);
          });
        }
      } else {
        // All other projects
        marker.data = project;
        pruneClusterMarker.RegisterMarker(marker);
      }

      projectLocations = [];
    }
  });

  // Create cluster object that map can understand
  const clusters = [{
    id: 'cluster',
    marker: pruneClusterMarker
  }];

  if (pruneClusterDetailMarker) {
    clusters.push({
      id: 'detail',
      marker: pruneClusterDetailMarker
    });
  }

  return clusters;
}

export { getMarkers };
