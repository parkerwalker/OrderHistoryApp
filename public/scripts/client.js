console.log('js');
$(onReady);

function onReady(){
  console.log('jq');
  customerList();
  //end on page loads
  $('#clientList').on('click', '#showOrders', showOrdersButton);
}//end on ready

function customerList(){
  $.ajax({
    type: 'GET',
    url: 'get/customers',
    success: function(response){
      console.log('back from route customers', response);
      for (var i = 0; i < response.length; i++) {
       var listOfCustomers = '<li>';
       listOfCustomers += response[i].first_name + ' ' + response[i].last_name;
       listOfCustomers += '<button type="button" id="showOrders" data-id="' + response[i].id +'">Show Orders</button></li>';

       $('#clientList').append(listOfCustomers);
     }
   }//end success
 });//end ajax
};//end customerList

function showOrdersButton(){
  console.log('show orders click', $(this).data('id'));
  var id = $(this).data('id');

  $.ajax({
    type: 'GET',
    url: '/get/' + id,
    success: function(response){
      console.log('back from route customers', response);

    }//end success
 });//end ajax
};
