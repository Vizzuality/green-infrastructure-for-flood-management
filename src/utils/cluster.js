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
  const pruneCluster = new PruneClusterForLeaflet();
  const { projectDetail } = props;

  /* Marker icon */
  pruneCluster.PrepareLeafletMarker = (leafletMarker, data) => {
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
  };

  /* Cluster */

  pruneCluster.BuildLeafletCluster = (cluster, position) => {
    let className = 'c-marker';
    const markers = cluster.GetClusterMarkers();
    let isCurrent = false;

    if (projectDetail) {
      isCurrent = markers.some(marker => marker.data.id === projectDetail.id);
    }
    if (isCurrent) className += ' -current';

    const size = 15 + Math.pow(cluster.population * 100, 0.5);
    /* Cluster icon */
    const icon = L.divIcon({
      iconSize: [size, size],
      className,
      html: `<div class="marker-inner">${cluster.population}</div>`
    });

    const marker = new L.Marker(position, { icon });

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
  };

  function pushMarker(project) {
    let lat;
    let lng;
    let marker;
    // Iterate over all posible project locations
    project.locations.forEach((location) => {
      lat = location.centroid.coordinates[1];
      lng = location.centroid.coordinates[0];
      marker = new PruneCluster.Marker(lat, lng);
      marker.data = project;
      pruneCluster.RegisterMarker(marker);
    });
  }

  // NOTE: following commented code just displays selected project locations
  // const { projectDetail } = props;
  // if (projectDetail) {
  //   // If projectDetails is setted, just display that project on map
  //   if (projectDetail.locations && projectDetail.locations.length) {
  //     pushMarker(projectDetail);
  //   }
  // } else {
  //   // If not, let's show all projects
  //   props.projects.filter(p => p.locations && p.locations.length && p.locations[0].centroid)
  //   .forEach(pushMarker);
  // }
  // return (props.projects.length || projectDetail) ? [{ id: 'clusterLayer', marker: pruneCluster }] : [];

  props.projects.filter(p => p.locations && p.locations.length && p.locations[0].centroid)
  .forEach(pushMarker);

  return props.projects.length ? [{ id: 'clusterLayer', marker: pruneCluster }] : [];
}

export { getMarkers };
