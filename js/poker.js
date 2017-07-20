/**
 * Created by Administrator on 2017/4/10.
 */
$(function () {
    // 牌的数组
    let poker=[];
    //花色数组
    let flower=['c','d','s','h'];
    //用来判断的对象sign
    let sign={};
    //循环的将牌放入数组
    while (poker.length<52){
        //随机获取数字
        let number=Math.ceil(Math.random()*13);
        //随机获取花色
        let flow=flower[Math.floor(Math.random()*flower.length)];
        //判断sign里是否已经有对应的牌
        if(!sign[number+'_'+flow]){
            //将数字和花色压入sign和数组
            sign[number+'_'+flow]=true;
            poker.push({number,flow});
        }

    }

    //发牌
    //上面的牌
    let n=0;
    for (let i=0;i<7;i++){
        for(let j=0;j<i+1;j++){
            //创建li用来存牌
            $('<li>').attr({id:i+'_'+j,value:poker[n].number,class:'poker'}).css('background-image',`url(img/${poker[n].number}${poker[n].flow}.png)`).appendTo('ul').delay(n*50).animate({
                left:300-50*i+100*j,
                top:50*i,
                opacity:1,
            },400);

            n++;
        }
    }
    //剩下的牌
    for (;n<52;n++){
        $('<li>').attr({id:7+'_'+n,value:poker[n].number,class:'poker zuo'}).css('background-image',`url(img/${poker[n].number}${poker[n].flow}.png)`).appendTo('ul').delay(n*50).animate({
            left:130,
            top:460,
            opacity:1,
        },400);
    }
    //点击
    //当前点击的暂存区
    let currentobj=null;
    $('.poker').click(function () {
        //获取点击的x和y
        let x=parseInt($(this).attr('id').split('_')[0]),
            y=parseInt($(this).attr('id').split('_')[1]);
        console.log(x,y);
        //判断 被压着的不加
        if(x<6){
            if($(`#${x+1}_${y}`).length==1||$(`#${x+1}_${y+1}`).length==1){
                console.log(`#${x+1}_${y}`);
                console.log(`#${x+1}_${y+1}`);
                return;
            }
        }
        //加类名
        $(this).toggleClass('active');
        //判断两个相加的和是否为13
        //如果当前的curentobj没值，就将当前点击的那个对象保存起来
        if(!currentobj){
            //如果当前的值就是13 那么直接飞走,否则存入currentobj
            if($(this).attr('value')==13){
                $(this).removeClass('active').animate({
                    left:600,
                    top:10,
                    opacity:0,
                },500,function () {
                    // $(this).remove();
                    $('ul')[0].removeChild(this);
                })
            }else {
                currentobj=$(this);
            }
        }else {
            //如果currentobj保存值了，判断两者相加的值是否为13
            if(parseInt(currentobj.attr('value'))+parseInt($(this).attr('value'))==13){
                $('.active').removeClass('active').animate({
                    left:600,
                    top:10,
                    opacity:0,
                },500,function () {
                    // $('.active').remove();
                    $('ul')[0].removeChild(this);
                });
                currentobj=null;
            }else {
                setTimeout(function () {
                    $('.active').removeClass('active')
                },400);
                currentobj=null;
            }
        }
    });
    //左右箭头点击
    let indexs=1;
    $('.right').click(function () {
        indexs++;
        $('.zuo').last().addClass('you').removeClass('zuo').css({zIndex:indexs}).animate({
            left:500,
        });
    });

    $('.left').click(function () {
        indexs++;
        $('.you').addClass('zuo').removeClass('you').css({zIndex:indexs}).each(function (index) {
            $(this).delay(index*40).animate({
                left:130,
            },400);
        })
    })


});