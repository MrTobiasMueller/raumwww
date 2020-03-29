// FULLSCREEN CONTROL **********************************************************
map.addControl(new L.Control.Fullscreen({
    title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen',
            },
    position: 'topright'
}));
map.isFullscreen() // Is the map fullscreen?
map.toggleFullscreen() // Either go fullscreen, or cancel the existing fullscreen.
// `fullscreenchange` Event that's fired when entering or exiting fullscreen.
map.on('fullscreenchange', function () {
    if (map.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});
map.zoomControl.setPosition('bottomright');
// *****************************************************************************

//OVERLAY TOP ******************************************************************
var links_top = L.control({position: 'topleft'});
links_top.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
links_top.update = function (props) {
    this._div.innerHTML = '<div class="overlay overlay-top">' +
                            '<h1>' +
                            '<span>a</span>' +
                            '<span>fragmentary</span>' +
                            '<span>archive</span>' +
                            '</h1>' +
                            '<a href="mailto:mail@raumwww.de?body=Hello%20Daniel%20and%20Johannes,%0D%0A%0D%0Ahere%20are%20my%20details.%0D%0A%0D%0AArtist%3A%0D%0A%0D%0AExhibition%3A%0D%0A%0D%0ADate%3A%0D%0Aplanned%20date%20IF%20there%20was%20a%20certain%20one%0D%0A%0D%0AInstitution%3A%0D%0A%0D%0AImage%3A%0D%0Atitle,%20size,%20material,%20year%0D%0A%0D%0ALinks%3A%0D%0Awebsite,%20instagram,%20institution.com%0D%0A%0D%0AInfo%3A%0D%0Ashort%20introduction%20/%20group%20show%20with%20these%20artists%20/%20documented%20online%20/%20here...%0D%0A%0D%0AImage%20attached,%20with%20at%20least%20750px%20width">contact</a>' +
                          '</div>';
};
links_top.addTo(map);
// *****************************************************************************

//OVERLAY BOTTOM ***************************************************************
var links_bottom = L.control({position: 'bottomleft'});
links_bottom.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
links_bottom.update = function (props) {
    this._div.innerHTML = '<div class="overlay overlay-bottom">' +
                            '<a href="pages/imprint.html">about/imprint</a>' +
                          '</div>';
};
links_bottom.addTo(map);
// *****************************************************************************


// DEFINITION DER ICON-KLASSE **************************************************
var icon_size = 20;
var pA_x = 140;
var ExhibitionIcon = L.Icon.extend({
  options: {
    iconSize:     [icon_size, icon_size],
    iconAnchor:   [icon_size/2, icon_size/2],
    closeButton: '',
    popupAnchor : [pA_x, 0]
  }
});
var icon_open = new ExhibitionIcon({iconUrl: '././style/icons/marker/marker_open.svg'}), //././icons/marker/
    icon_closed = new ExhibitionIcon({iconUrl: '././style/icons/marker/marker_closed.svg'}), //././icons/marker/
    icon_highlight = new ExhibitionIcon({iconUrl: '././style/icons/marker/marker_highlight.svg'}); //././icons/marker/
//******************************************************************************


// DEFINITION DER POPUP-KLASSE *************************************************
var ExhibitionPopup = L.Popup.extend({
  options: {
    closeButton : ''
  }
});
//******************************************************************************
