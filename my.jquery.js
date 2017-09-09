/**
 * Created by tangna on 2016/11/15.
 */
jQuery(document).ready(function($) {
    $('.theme-out').click(function () {
       $('.theme-popover-mask').fadeIn(100);
        $('.theme-popover').slideDown(200);
    })
    
    $('.theme-poptit .close').click(function () {
       $('.theme-popover-mask').fadeOut(100);
        $('.theme-popover').slideUp(200);
    })
    $("#search").click(function () {
        $("#choice").val("1");
    });
    $("#add").click(function () {
        $("#form_title").text("新增");
        $("#data_id").val('');
        $("#n_name").val('');
        $("#n_command").val('');
        $("#check_type").val('');
        $("#n_is_on").val('');
        $("#url").val('');
        $("#expected_result").val('');
        $("#email").val('');
        $("#daddform").css('display', 'block');
        $("#check_div_d").show();
        $("#expected_result_d").show();
    });

     $(".modify").click(function () {
        $("#form_title").text("修改");

        var table_text=$(this).parent().siblings().text();
        var table_text_arr = table_text.split("\n");
//        for (var x in table_text_arr){
//            console.log(x+":"+table_text_arr[x]);
//        }
        //console.log(table_text_arr[3])
        if (table_text_arr[3]==''){
           $("#check_div_d").hide();
        }
        else{
            $("#check_div_d").show();
        }
        if(table_text_arr[6]==''){
           $("#expected_result_d").hide();
        }
        else{
            $("#expected_result_d").show();
        }
        $("#data_id").val(table_text_arr[0]);
        $("#n_name").val(table_text_arr[1]);
        $("#n_command").val(table_text_arr[2]);
        $("#check_type").val(table_text_arr[3]);
        $("#n_is_on").val(table_text_arr[4]);
        $("#url").val(table_text_arr[5]);
        $("#expected_result").val(table_text_arr[6]);
        $("#email").val(table_text_arr[9]);
        $("#daddform").css('display', 'block');
    });

    $(".history").click(function () {
        var id=$(this).parent().siblings().eq(0).text();
        $(".history").attr("href", "/history/?history_id="+id);
    });

    $("#fresh").click(function () {
        $("#choice").val("1");
        //console.log($("#choice").val());
    });

    $("#n_command").change(function(){
        var se=$("#n_command option:selected").val();
        if(se!="curl"&&se!=""){
            $("#check_div_d").hide();
            $("#expected_result_d").hide();
            $("#check_type").val('');
            $("#expected_result").val('');
        }else{
            $("#check_div_d").show();
            $("#expected_result_d").show();
        }
    });
    $("#add_new").click(function () {
        var name=$("#n_name").val();
        var commond=$("#n_command").val();
        var check_type=$("#check_type").val();
        var url=$("#url").val();
        var email=$("#email").val();
        var expected_result=$("#expected_result").val();
        if(commond=="curl"){
          if(name==""){
             alert("别名为必填项，请填写");
             return false;
          }
          else if(commond==""){
             alert("监控命令为必填项，请填写");
             return false;
          }
          else if(check_type==""){
             alert("判断方式为必填项，请填写");
             return false;
          }
          else if(url==""){
             alert("API&服务为必填项，请填写");
             return false;
          }
          else if(expected_result==""){
             alert("验证值为必填项，请填写");
             return false;
          }
          else if(email==""){
             alert("email为必填项，请填写");
             return false;
          }
        }
        else{
          if(name==""){
             alert("别名为必填项，请填写");
             return false;
          }
          else if(commond==""){
             alert("监控命令为必填项，请填写");
             return false;
          }
          else if(url==""){
             alert("API&服务为必填项，请填写");
             return false;
          }
          else if(email==""){
             alert("email为必填项，请填写");
             return false;
          }
        }
        var s_choice = $("#form_title").text();
        if(s_choice=="修改"){
            $("#add_choice").val("2");
        }
        else{
            $("#add_choice").val("4");
        }
    });
    $("tbody tr").mouseover(function () {
        $(this).attr("class", "active");
    });
    $("tbody tr").mouseout(function () {
        $(this).removeClass("active");
    });
    $(".delete").click(function(){
        var r=confirm("确定删除吗？");
        if (r){
            var id=$(this).parent().siblings().eq(0).text();
            $.get("/", {data_id:id, choice:"6"}, function(data, status){
                if (status=="success"){
                    window.location.reload();
                }
                else{
                    alert("删除失败！");
                }
            });
        }
    });


});
