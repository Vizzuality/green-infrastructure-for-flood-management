import L from 'leaflet/dist/leaflet';
import { PruneCluster, PruneClusterForLeaflet } from 'lib/PruneCluster';
import { replace } from 'react-router-redux';
import { dispatch } from 'main';
import * as polyneSnake from 'leaflet.polyline.snakeanim';

import { SvgIcon } from 'vizz-components';

PruneCluster.Cluster.ENABLE_MARKERS_LIST = true;

function clearMapLine() {
  return window.__map__ &&
    window.__map__.__line__ &&
    window.__map__.__line__.forEach(l => window.__map__.removeLayer(l));
}

function getPopupMarkup(data) {
  const orgs = `${data.organizations[0].name} ${data.organizations.length > 1 ? `<span class="c-plus-number -right"}>+${data.organizations.length - 1}</span>` : ''}`;
  const solutions = `${data.nature_based_solutions[0].name} ${data.nature_based_solutions.length > 1 ? `<span class="c-plus-number -right"}>+${data.nature_based_solutions.length - 1}</span>` : ''}`;
  const hazards = `${data.hazard_types[0].name} ${data.hazard_types.length > 1 ? `<span class="c-plus-number -right"}>+${data.hazard_types.length - 1}</span>` : ''}`;
  const url = `/map/project/${data.id}`;

  const myPopup = L.DomUtil.create('div', 'infoWindow');

  myPopup.innerHTML = `
    <div class="c-tooltip">
      <div class="tooltip-content">
        <div class="project-orgs">${orgs}</div>
        <div class="project-name">${data.name}</div>
        <ul class="project-properties">
          <li class="property" title="Nature Base Solutions">
            <svg class="c-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-enter"></use></svg>
            ${solutions}
          </li>
          <li class="property" title="Hazards">
            <svg class="c-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-flag"></use></svg>
            ${hazards}
          </li>
        </ul>
      </div>
      <a class="tooltip-link">More info</a>
    </div>
  `;

  const moreInfoButton = myPopup.querySelector('a');

  if (moreInfoButton) {
    moreInfoButton.addEventListener('click', () => dispatch(replace(url)));
  }

  return myPopup;
}

function getMarkers(props) {
  const { projectDetail } = props;
  clearMapLine();

  /* Project centroid marker icon */
  function PrepareLeafletMarker(leafletMarker, data) {
    let className = 'c-marker';
    let iconSize = [20, 20];

    const markerData = Object.assign({}, data, { currentDetail: projectDetail && (projectDetail.id === data.id) });

    if (markerData.current) {
      className += ' -current';
      iconSize = [6, 6];
    }
    if (markerData.centroid) {
      className += ' -centroid';
    }

    leafletMarker.setIcon(L.divIcon({
      iconSize,
      className,
      html: '<div class="marker-inner"></div>'
    }));

    if (!markerData.current) {
      // Bind Popup
      leafletMarker.bindPopup(getPopupMarkup(markerData));
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

  const pruneClusterMarker = new PruneClusterForLeaflet(20);
  pruneClusterMarker.PrepareLeafletMarker = PrepareLeafletMarker;
  pruneClusterMarker.BuildLeafletCluster = BuildLeafletCluster;
  pruneClusterMarker.BuildLeafletClusterIcon = BuildLeafletClusterIcon;
  let delay = 200;

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
        if (projectLocations.length > 1) {
          projectLocations.forEach((location) => {
            marker = new PruneCluster.Marker(location[0], location[1]);
            marker.data = { ...project, current: true };
            pruneClusterDetailMarker.RegisterMarker(marker);

            // Connect point to centroid with a line
            const line = L.polyline([centroid, location], {
              color: '#FFB400',
              weight: 2,
              snakingSpeed: 1280
            });

            delay += 300;

            setTimeout(() => {
              line.addTo(window.__map__).snakeIn();
            }, delay);

            window.__map__.__line__ = window.__map__.__line__ || [];
            window.__map__.__line__.push(line);
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
