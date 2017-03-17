// 引入zepto-modules模块
var $ = require('zepto-modules/zepto');

require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/ie');
require('zepto-modules/touch');
module.exports = $;
   
var wx = require('./components/weixin/jweixin-1.0.0.js');


// $.ajax({   
// 	type:'POST',
// 	url:'http://www.dogfather1108.online/www/php/getsign.php',
// 	data:{url:window.location.href},
// 	dataType:'json',
// 	success:function(res){
// 		console.log(res)
// 		wx.config({
// 			debug: true,
// 		    appId: res.appId,
// 		    timestamp:res.timestamp,
// 		    nonceStr: res.nonceStr,
// 		    signature: res.signature,
// 		    jsApiList: [
// 		      'chooseImage','scanQRCode'
// 		    ]
// 		})
// 	}   
// })
$('#scan').on('tap',function(){
	wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        alert(result);
    }
    });
})
$('#photo').on('tap',function(){
	 wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      }
  });
})
	// $.ajax({
	//   type: 'GET',
	//   url: 'http://localhost:3000/comment/api',
	//   success: function(data) {
	//     console.log(data);
	//   }
	// });


// $.ajax({
//   type: 'GET',
//   url: '/api/skill.php',
//   success: function(data) {
//     console.log(data);
//   }
// });

$("#mainContent").hide();

// 引入swiper模块
var Swiper = require('./components/swiper/swiper.min.js');

var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');


      

// var IScroll = require('./components/iscroll/iscroll.js');
// var myScroll = new IScroll('#wrapper',{bounceEasing:'elastic',bounceTime:1200});
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
//   capture: false,
//   passive: false
// } : false);
// function isPassive() {  
//   var supportsPassiveOption = false;
//   try {
//       addEventListener("test", null, Object.defineProperty({}, 'passive', {
//           get: function () {
//               supportsPassiveOption = true;
//           }
//       }));
//   } catch(e) {}
//   return supportsPassiveOption;
// }
var IScroll = require('./components/iscroll/iscroll.js');
var myScroll = new IScroll('#wrapper',{bounceEasing:'elastic',bounceTime:1200});
// document.addEventListener('touchmove',function(e){},false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
  capture: false,
  passive: false
} : false);
function isPassive() {
  var supportsPassiveOption = false;
  try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () {
              supportsPassiveOption = true;
          }
      }));
  } catch(e) {}
  return supportsPassiveOption;
}


$('#enter').click(function(){
  $(".swiper-container").hide();
  $("#mainContent").show();
	 $.ajax({
	  type: 'GET',
	  url: './api/skill.php',
	  success: function(data) {
	  	
		for (var i = 0; i < data.length; i++) {
			// console.log(data[i].category)
			
			var int = $("<li></li>").data("index",i).html(data[i].category)
			int.appendTo($('#scroller>ul'));
			myScroll.refresh();
		};
		
		}

	});

	$.ajax({
		  type: 'GET',
		  url: './api/work.php',
		  success: function(data) {
		  	

		  	for (var i = 0; i < data.length; i++) {
		  		// console.log(data[i]);
		  		var int = $('.myWork1').clone(true);
		  		int.find('.span1').html(data[i].name);
		  		int.find('.span2').html(data[i].category) ; 
		  		int.find('.span3').html(data[i].url) ; 
		  		int.find('.span4').html(data[i].time) ; 
		  		int.find('.span5').html(data[i].posts);
		  		int.find('.span6').html(data[i].reportto);
		  		int.find('.span6').html(data[i].peoples);
		  		int.find('.span6').html(data[i].projects);
		  		int.show().appendTo('#myWork');
		  		myScroll.refresh();
		  	};
		  
		  }
		});

		$.ajax({
			  type: 'GET',
			  url: './api/project.php',
			  success: function(data) {

			  	for (var i = 0; i < data.length; i++) {
			  		 
			  		var html = ''
			  		html += "<li>"+data[i].name+"</li>"
			  		html += "<li>"+data[i].category+"</li>"
			  		html += "<li>"+data[i].url+"</li>"
			  		html += "<li>"+data[i].description+"</li>"
			  		html += "<li>"+data[i].detail+"</li>"
			  		html += "<li>"+data[i].tech+"</li>"
			  		var int = $('<ul></ul>').html(html)
			  		int.appendTo('#project')
			  		myScroll.refresh();
			  	}
			  	
			  	
			  }
		});
}) ;


   

// $("#footer div").tap(function(){
// 	var apiTarget = $(this).attr("id");
// 	var apiUrl = "/api/" + apiTarget + ".php";

// 	$.ajax({
// 	  type: 'GET',
// 	  url: apiUrl,
// 	  success: function(data) {
// 	  	var html = "";
	  	
// 	  	for (var i = 0; i < data.length; i++) {
// 	  		html += "<li>" + data[i].name  +"</li>";
// 	  	};

// 	  	$("#scroller ul").html(html);
	    
// 	  }
// });


// })

  var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
     	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
	    swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
	    swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	  	},
	  	onSlideChangeEnd: function(swiper){ 
	    swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	  	} 
    });


 


//主页iscroll效果
// var myScroll;
// function loaded(){
//   setTimeout(function(){
//     myScroll = new IScroll('#wrapper');
//   },100);
// }
// window.addEventListener('load',loaded,false);



	
	

$('#skill').on('tap',function(){
	$('#scroller').css('display','block');
	$('#myWork').css('display','none');
	$('#project').css('display','none');
	$('#me').css('display','none');
			

})
$('#work').on('tap',function(){
	$('#scroller').css('display','none');
	$('#myWork').css('display','block');
	$('#project').css('display','none');
	$('#me').css('display','none');

		

})
$('#project1').on('tap',function(){
	$('#scroller').css('display','none');
	$('#myWork').css('display','none');
	$('#project').css('display','block');
	$('#me').css('display','none');

			
			

})
$('#me1').on('tap',function(){
	$('#scroller').css('display','none');
	$('#myWork').css('display','none');
	$('#project').css('display','none');
	$('#me').css('display','block');

})
$('#footer>div').tap(function(){
	$('#footer>div').css('opacity','0.5')
	$(this).css('opacity','1')
})

$('.musi').tap(function(){
	var audioPlayer = document.querySelector('audio');
	
	if (audioPlayer.paused) {
		audioPlayer.play();
		
	}else{
		
		audioPlayer.pause();
		
	}
});
 

$("#scroller>ul").on('tap','#scroller>ul>li',function(){
	var num = $(this).data('index')
$.ajax({
  type: 'GET',
  url: './api/skill.php',
  success: function(data) {
  	
  	for (var i = 0; i < data.length; i++) {

  		console.log(num)
  		if (i==num) {
  			
  			$('.D1').html(data[i].category)
  			$('.D2').html(data[i].name)
  			$('.D3').html(data[i].time)
  			$('.D4').html(data[i].level)
  			$('#wind').show()
  		}
  	};
  	
   
  }
})
})
$('#wind').tap(function(){
	$('#wind').hide()
})
// $('#scroller ul li').tap(function(){
// 	console.log($(this).data('index'))
// 	$('<div></div>').html($(this).data('index')).appendTo($('#scroller'))
// })

