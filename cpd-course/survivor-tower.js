/* Tower geometry follows the schematic in the CPD reader and workbook. */
(function () {
  'use strict';
  var host = document.querySelector('.survivor-tower');
  if (!host) return;
  var svg = host.querySelector('svg');
  var original = svg.innerHTML;
  var namespace = 'http://www.w3.org/2000/svg';
  var cards = Array.from(host.querySelectorAll('.survivor-account'));

  function shape(tag, attributes) {
    var node = document.createElementNS(namespace, tag);
    Object.keys(attributes).forEach(function (key) { node.setAttribute(key, attributes[key]); });
    svg.appendChild(node);
  }

  function layout() {
    var width = host.clientWidth;
    if (width < 680) {
      host.classList.remove('is-diagram');
      host.style.removeProperty('height');
      cards.forEach(function (card) { card.style.removeProperty('top'); });
      svg.setAttribute('viewBox', '0 0 420 540');
      svg.innerHTML = original;
      return;
    }
    host.classList.add('is-diagram');
    var emma = cards[0], shahid = cards[1], miguel = cards[2];
    var height = Math.ceil(Math.max(760, (shahid.offsetHeight + miguel.offsetHeight + 70) / .7, (emma.offsetHeight + 70) / .8));
    host.style.height = height + 'px';
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.innerHTML = '<title id="survivor-tower-title">Grenfell Tower: three survivors’ accounts</title><desc id="survivor-tower-description">Highlighted floors connect Emma O’Connor on the 20th floor, Shahid Ahmed on the 18th, and Miguel Alves on the 13th to their accounts.</desc>';
    var y = 8, h = height - 16, w = Math.min(width * .17, h * .14), x = (width - w) / 2;
    var crown = h * .07, podium = h * .13, body = h - crown - podium, floorHeight = body / 20;
    var green = '#006a46', fine = '#cfe3d6';
    shape('rect', {x:x-w*.04,y:y+h-podium,width:w*1.08,height:podium,fill:'#fdf9f2',stroke:green,'stroke-width':1.2});
    shape('rect', {x:x,y:y+crown,width:w,height:body,fill:'#fff',stroke:green,'stroke-width':1.2});
    shape('rect', {x:x-w*.03,y:y,width:w*1.06,height:crown,fill:'#fdf9f2',stroke:green,'stroke-width':1.2});
    for (var c=1;c<8;c++) shape('line',{x1:x+w*c/8,y1:y+crown,x2:x+w*c/8,y2:y+crown+body,stroke:fine,'stroke-width':.8});
    for (var f=1;f<20;f++) shape('line',{x1:x,y1:y+crown+f*floorHeight,x2:x+w,y2:y+crown+f*floorHeight,stroke:fine,'stroke-width':.8});
    for (var cap=1;cap<9;cap++) shape('line',{x1:x-w*.03+w*1.06*cap/9,y1:y,x2:x-w*.03+w*1.06*cap/9,y2:y+crown,stroke:fine,'stroke-width':.8});
    function floorY(floor) { return y+crown+(23-floor+.5)*floorHeight; }
    cards.forEach(function (card,index) {
      var floor = Number(card.dataset.floor), fy = floorY(floor);
      var heading = card.querySelector('h2');
      var top = fy - heading.offsetHeight / 2;
      if (index === 2) top = Math.max(top, shahid.offsetTop + shahid.offsetHeight + 36);
      card.style.top = Math.round(top) + 'px';
      var cy = card.offsetTop + heading.offsetHeight / 2;
      var left = index === 0, fx = left ? x : x+w;
      var cx = left ? card.offsetLeft+card.offsetWidth+12 : card.offsetLeft-12;
      var mid = (fx+cx)/2;
      shape('rect',{x:x,y:fy-floorHeight/2,width:w,height:floorHeight,fill:'#d5f35b',opacity:.7,'data-floor':floor});
      var line = 'M '+fx+' '+fy+' H '+cx;
      if (cy-fy>16) line = 'M '+fx+' '+fy+' H '+(mid-8)+' Q '+mid+' '+fy+' '+mid+' '+(fy+8)+' V '+(cy-8)+' Q '+mid+' '+cy+' '+(mid+8)+' '+cy+' H '+cx;
      shape('path',{d:line,fill:'none',stroke:'#06301f','stroke-width':1.2,'stroke-linejoin':'round'});
      shape('circle',{cx:fx,cy:fy,r:5.5,fill:'#06301f',stroke:'#d5f35b','stroke-width':3});
    });
  }

  var frame;
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(layout); }
  layout();
  document.fonts.ready.then(schedule);
  var lastWidth = host.clientWidth;
  new ResizeObserver(function () {
    if (host.clientWidth !== lastWidth) { lastWidth = host.clientWidth; schedule(); }
  }).observe(host);
})();
