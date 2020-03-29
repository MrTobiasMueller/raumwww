// FUNKTION Y-X-SWITCH *********************************************************
var yx = L.latLng;
var xy = function(x, y) {
    if (L.Util.isArray(x)) {
        return yx(x[1], x[0]);
    }
    return yx(y, x);
};
// *****************************************************************************

// FUNKTION CONTENTSTRING ******************************************************
function buildContentString(content) { //artist, exhibition, date, institution, status, image, links, info
  var contentString = '<dl>';
  for(var a=0;a<content.length;a++) {
    var tempContent = content[a];
    if(a==6) {
      contentString+='<dt>links:</dt> <dd>';
      for(var b=0;b<tempContent.length;b++) {
        contentString+="<a href=http://" + tempContent[b] + " target='_blank'>" + tempContent[b] + "</a>";
      }
    }else{
      switch(a){
        case 0: contentString+='<dt>artist:</dt> <dd>'; break;
        case 1: contentString+='<dt>exhibition:</dt> <dd>'; break;
        case 2: contentString+='<dt>institution:</dt> <dd>'; break;
        case 3: contentString+='<dt>date:</dt> <dd>'; break;
        case 4: contentString+='<dt>status:</dt> <dd>'; break;
        case 5: contentString+='<dt>image:</dt> <dd>'; break;
        case 7: contentString+='<dt>info:</dt> <dd>'; break;
      }
      for(var b=0;b<tempContent.length;b++) {
        contentString+='<span>' + tempContent[b] + '</span>';
      }
    }
    contentString+='</dd>';
  }
  // DECKEL DRAUF
  contentString+='</dl>';
  // OUTPUT
  return contentString;
}
// *****************************************************************************

// FUNKTION PLACEIMAGE *********************************************************


function placeImage (image, status, content){ //content
  var string = image;
  //var regex = /^[a-zA-Z0-9]+_[a-zA-Z0-9]+-(\d+)x(\d+)-(\d+)x(\d+)/;
  var regex = /(\d+)x(\d+)-(\d+)x(\d+)/;
  var subStrings = regex.exec(string);
  if(subStrings) {
    var image_zero_x = Number(subStrings[1]);
    var image_zero_y = Number(subStrings[2]);
    var image_width = Number(subStrings[3]);
    var image_height = Number(subStrings[4]);
  } else {
    alert('Bitte überprüfe das Format des Dateinamen.');
  }

  /*var image_zero_x = x;
  var image_zero_y = y;
  var image_width = width;
  var image_height = height;*/

  image_zero_x*=scaleFactor;
  image_zero_y*=scaleFactor;

  image_width*=scaleFactor;
  image_height*=scaleFactor;

  var image_zero = xy(image_zero_x, image_zero_y);
  var image_size = xy(image_width+image_zero_x, image_height+image_zero_y);
  var image_bounds = [[image_zero], [image_size]];
  var image = L.imageOverlay('././images/' + image, image_bounds).addTo(map).setOpacity(1);

  var popup = new ExhibitionPopup({className: status}) //'maxWidth' : '200'
                                    .setContent(
                                      "<dl> " + buildContentString(content) + "</dl>"
                                    );

  //var marker_icon = icon_open;
  switch(status) {
    case 'open': marker_icon = icon_open; break;
    case 'closed': marker_icon = icon_closed; break;
    case 'highlight': marker_icon = icon_highlight; break;
  }


  var marker_offset_right = icon_size*2;
  var marker_offset_bottom = icon_size*2;
  var marker = L.marker(xy(image_zero_x + image_width-marker_offset_right, image_zero_y + marker_offset_bottom),
                        { icon : marker_icon }
                       ).bindPopup(popup).addTo(map);
}
// *****************************************************************************
