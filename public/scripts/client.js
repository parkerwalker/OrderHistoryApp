console.log('js');
$(onReady);

function onReady(){
  console.log('jq');
  customerList();
  customerOrderInfo();
  $('.clientList').on('click', '#showOrders', showOrdersButton);
}//end on ready

function customerList(){
  $.ajax({
    type: 'GET',
    url: 'get/customers',
    success: function(response){
      console.log('back from route customers', response);
      for (var i = 0; i < response.length; i++) {
       var listOfCustomers = '<li data-id="' + response[i].id +'">';
       listOfCustomers += response[i].first_name + ' ' + response[i].last_name;
       listOfCustomers += '<button type="button" id="showOrders" data-id="' + response[i].id +'">Show Orders</button></li>';

       $('.clientList').append(listOfCustomers);
     }
   }//end success
 });//end ajax
};//end customerList

function showOrdersButton(){
  console.log('show orders click', $(this).parent().data());
}

function customerOrderInfo(){
  $.ajax({
    type: 'GET',
    url: 'get/orderInfo',
    success: function(response){
      console.log('back from route customers', response);

    }//end success
 });//end ajax
};//end customerList
