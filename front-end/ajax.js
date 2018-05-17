$(document).ready(function() {
// Добавляем новую запись, когда произошел клик по кнопке
    var clients;
    $("#submit").click(function (e) {
        e.preventDefault();

        var data = $('#fr').serializeArray();
        var obj = {};
        for (var i = 0; i < data.length; i++) {
            obj[data[i].name] = data[i].value;
        }

if(obj.name=="" || obj.surname=="" || obj.patr=="" || obj.bday=="" || obj.seria=="" || obj.num=="" || obj.issued=="" || obj.data=="" || obj.num_id=="" || obj.place=="" || obj.town=="" || obj.address=="" || obj.townpr=="" || obj.addresspr=="" || obj.fam=="" || obj.nation=="" || obj.inval=="" || obj.b==""){
            alert("Необходимо заполнить все обязательные поля!");
}
else{
    var obj = JSON.stringify(obj);
        jQuery.ajax({
            type: "POST", // HTTP метод  POST или GET
            url: "save_clients", //url-адрес, по которому будет отправлен запрос
            //dataType: "JSON", // Тип данных,  которые пришлет сервер в ответ на запрос ,например, HTML, json
            data: obj, //данные, которые будут отправлены на сервер (post переменные)
            success: function (response) {
                alert("Пользователь добавлен!");
                $("#fr")[0].reset();
                getClients();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error save" + thrownError); //выводим ошибку
            }
        });
        }
    });

    function getClients(){
        jQuery.ajax({
            type: "POST", // HTTP метод  POST или GET
            url: "show_clients", //url-адрес, по которому будет отправлен запрос
            dataType: "JSON", // Тип данных,  которые пришлет сервер в ответ на запрос ,например, HTML, json
            success: function (response) {
                clients = response;
                $("#tb").html("");
                $("#tb").append(function () {
                    var text = "";
                    var pensionerr;
                    for (var i = 0; i < response.length; i++) {
                        if(response[i].pensioner == 0){pensionerr="да"}else {pensionerr="нет"}

                        text += "<tr id='tr_" + response[i].id + "'><td>" + response[i].name + "</td><td>" + response[i].surname + "</td><td>" + response[i].patr +
                            "</td><td>" + response[i].bday + "</td><td>" + response[i].seria +
                            "</td><td>" + response[i].num + "</td><td>" + response[i].issuedBy + "</td><td>" + response[i].data +
                            "</td><td>" + response[i].idPasport + "</td><td>" + response[i].birthplace + "</td><td>" + response[i].town +
                            "</td><td>" + response[i].address + "</td><td>" + response[i].telD + "</td><td>" + response[i].telM + "</td><td>"
                            + response[i].job+"</td><td>"+ response[i].post+"</td><td>"
                            + response[i].mail + "</td><td>" + response[i].cityOfReg + "</td><td>" + response[i].addressOfReg + "</td><td>" +
                            response[i].famStatus + "</td><td>" + response[i].nation + "</td><td>" + response[i].invalid + "</td><td>" +
                            pensionerr + "</td><td>" + response[i].income + "</td><td><input class='delete' type='button' value='-'></td></tr>";
                    }
                    return text;

                });
                $(".delete").click(function (e) {
                    var id = $(this).parent().parent().attr("id");
                    var obj={}
                    obj.id = id.split("_")[1];
                    var obj1 = JSON.stringify(obj);
                    console.log(id);

                    jQuery.ajax({
                        type: "POST", // HTTP метод  POST или GET
                        url: "delete_clients", //url-адрес, по которому будет отправлен запрос
                        //dataType: "JSON", // Тип данных,  которые пришлет сервер в ответ на запрос ,например, HTML, json
                        data: obj1, //данные, которые будут отправлены на сервер (post переменные)
                        success: function (response) {
                            alert("Пользователь удалён!");
                            getClients();
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            alert("error save" + thrownError); //выводим ошибку
                        }
                    });




                });

                for (var i = 0; i < response.length; i++) {
                    setListener("tr_" + response[i].id);
                }

                function setListener(id) {
                    document.getElementById(id).addEventListener("mousemove", func);
                    document.getElementById(id).addEventListener("click", func1);
                    document.getElementById(id).addEventListener("mouseout", func2);
                }

                function func() {
                    $(this).addClass("col");
                }

                function func1(e) {
                    var id = $(this).attr("id");
                    var origin = id.split("_")[1];
                    // console.log(origin);
                    for (var i = 0; i < clients.length; i++) {
                        if (origin == clients[i].id) {
                            $("#id").val(clients[i].id);
                            $("#name").val(clients[i].name);
                            $("#surname").val(clients[i].surname);
                            $("#patr").val(clients[i].patr);
                            $("#bday").val(clients[i].bday);
                            $("#seria").val(clients[i].seria);
                            $("#num").val(clients[i].num);
                            $("#issued").val(clients[i].issuedBy);
                            $("#date").val(clients[i].data);
                            $("#num_id").val(clients[i].idPasport);
                            $("#place").val(clients[i].birthplace);
                            $("#town").val(clients[i].town);
                            $("#address").val(clients[i].address);
                            $("#td").val(clients[i].telD);
                            $("#tm").val(clients[i].telM);
                            $("#mail").val(clients[i].mail);
                            $("#job").val(clients[i].job);
                            $("#post").val(clients[i].post);
                            $("#townpr").val(clients[i].cityOfReg);
                            $("#addresspr").val(clients[i].addressOfReg);
                            $("#fam").val(clients[i].famStatus);
                            $("#nation").val(clients[i].nation);
                            if(response[i].pensioner == 1){
                                $("#net").prop("checked",true);
                                $("#da").removeAttr("checked");
                            }
                            else{
                                $("#da").prop("checked", true);
                                $("#net").removeAttr("checked");
                            }
                            $("#income").val(clients[i].income);
                        }
                    }
                }

                function func2() {
                    $(this).removeClass("col");
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error show" + thrownError); //выводим ошибку
            }
        });
    }



    $("#btn_2").click(function (e) {
        e.preventDefault();
        // тут нужно проверку сделать на нидден формы if()
        getClients();
        $("table").toggleClass("hidden");
    });
});


