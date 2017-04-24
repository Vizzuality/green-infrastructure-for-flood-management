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

  /* Marker icon */
  function PrepareLeafletMarker(leafletMarker, data) {
    let className = 'c-marker';

    // Highlight current project marker
    if (projectDetail && projectDetail.id === data.id) {
      className += ' -current';
    }

    leafletMarker.setIcon(L.divIcon({
      iconSize: [15, 15],
      className,
      html: '<div class="marker-inner"></div>'
    }));

    // Bind Popup
    leafletMarker.bindPopup(getPopupMarkup(data));

    // Set listeners
    leafletMarker.off('click').on('click', function mouseover() {
      this.openPopup();
    });
  }

  /* Cluster */
  function BuildLeafletClusterIcon(cluster) {
    let className = 'c-marker';
    const markers = cluster.GetClusterMarkers();
    let isCurrent = false;

    // Highlight the cluster if contains a marker that belongs to current project
    if (projectDetail) {
      isCurrent = markers.some(marker => marker.data.id === projectDetail.id);
    }
    if (isCurrent) className += ' -current';

    const size = 15 + ((cluster.population * 100) ** 0.5);
    /* Cluster icon */
    const icon = L.divIcon({
      iconSize: [size, size],
      className,
      html: `<div class="marker-inner">${cluster.population}</div>`
    });

    return icon;
  }

  function BuildLeafletCluster(cluster, position) {
    const icon = BuildLeafletClusterIcon(cluster);
    const marker = new L.Marker(position, { icon });
    const pruneCluster = this;
    // pruneCluster.RedrawIcons();

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
  const countryClusters = [];
  let lat;
  let lng;
  let marker;
  let cluster;

  props.projects.forEach((project) => {
    project.locations.forEach((location) => {
      cluster = countryClusters.find(c => c.id === location.country_iso);
      if (!cluster) {
        cluster = {
          id: location.country_iso,
          marker: new PruneClusterForLeaflet(60)
        };
        cluster.marker.PrepareLeafletMarker = PrepareLeafletMarker;
        cluster.marker.BuildLeafletCluster = BuildLeafletCluster;
        cluster.marker.BuildLeafletClusterIcon = BuildLeafletClusterIcon;
        countryClusters.push(cluster);
      }

      lat = location.centroid.coordinates[1];
      lng = location.centroid.coordinates[0];
      marker = new PruneCluster.Marker(lat, lng);
      marker.data = project;
      cluster.marker.RegisterMarker(marker);
    });
  });

  return countryClusters;
}

export { getMarkers };
