function showPlayers(valueSearch){
    $.ajax({
        type: "POST",
        url: "showPlayers.php",
        data: {
            search: valueSearch
        },
        cache: false,
        success: function(data) {

            $('.none').hide();
            if(/none/.test(data)){
                $('.none').show();
                $('#playerList').hide();
            }
           else{
                $('#playerList').show();
                var players = $.parseJSON(data);
                $('#playerList').html("<tr>" +
                    "<th>Nick</th>" +
                    "<th>ZSE Coinsy</th>" +
                    "<th>Rola</th>" +
                    "<th>Opcję</th>" +
                "</tr>");
                for(var i = 0; i < players.length; i++){
                    
                    $('#playerList').append('<tr>' +
                        '<td>' + players[i]['nick'] + '</td>' +
                        '<td>' +
                            '<input type="number" id="coins' + players[i]['id'] + '-' + players[i]['nick'] + '" value="' + players[i]['coins'] + '">' +
                        '</td>' +
                        '<td>' +
                            '<select id="role' + players[i]['id'] + '-' + players[i]['nick'] + '">' +
                                '<option value="' + players[i]['role'] + '" selected hidden>' + players[i]['role'] + '</option>' +
                                '<option value="admin">admin</option>' +
                                '<option value="user">user</option>' +
                            '</select>' +
                        '</td>' +
                        '<td>' +
                            '<button class="saveBtn" onclick="updatePlayers('+ players[i]['id'] +', \''+ players[i]['nick'] +'\')">Zapisz</button>' +
                        '</td>' +
                '</tr>');
                }
           }
        }
    });
}

showPlayers("");

let searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener("click", () => {
    showPlayers($('#search').val());
});

function updatePlayers(id, nick){
    $.ajax({
        type: "POST",
        url: "updatePlayers.php",
        data: {
            id: id,
            coins: $('#coins' + id + '-' + nick).val(),
            role: $('#role' + id + '-' + nick).val()
        },
        cache: false,
        success: function(data) {
            console.log(data);
           
        }
    });
}