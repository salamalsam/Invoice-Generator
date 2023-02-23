$('.card').click(function () {

    var product_id = $(this).attr('product_id');
    var product_name = $(this).attr('product_name');
    var product_price = $(this).attr('price');
    if (!$(`tbody tr td:first-child:contains('${product_id}')`).length) {
        $('tbody').append(`<tr>
                            <td>#${product_id}</td>
                            <td>${product_name}</td>
                            <td class="product_price">${product_price}</td>
                            <td><button onclick="decrease_quantity(this);">-</button><input type="text" value="1"><button onclick="increase_quantity(this);">+</button></td>
                            <td class="calculated_item_price">${product_price}</td>
                            <td>
                                <button onclick="remove_item(this)">Remove Item</button>
                            </td>
                        </tr > `);
        _calculate_total();
    }
});
function remove_item(item_obj) {
    $(item_obj).parent().parent().remove();
    _calculate_total();
}
function decrease_quantity(quantity_obj) {
    var previous_value = $(quantity_obj).siblings('input').val();
    if (previous_value > 1) {
        $(quantity_obj).siblings('input').val(parseInt(previous_value) - 1);
        var product_price = $(quantity_obj)
            .parent()
            .siblings('.product_price')
            .text();
        $(quantity_obj)
            .parent()
            .siblings('.calculated_item_price')
            .text(
                (parseInt(previous_value) - 1) * product_price
            );
    }
    _calculate_total();
}
function increase_quantity(quantity_obj) {
    var previous_value = $(quantity_obj).siblings('input').val();
    $(quantity_obj).siblings('input').val(parseInt(previous_value) + 1);
    var product_price = $(quantity_obj).parent().siblings('.product_price').text();
    $(quantity_obj).parent().siblings('.calculated_item_price').text((parseInt(previous_value) + 1) * product_price);
    _calculate_total();
}
function _calculate_total() {
    var total_ = 0;
    $('.calculated_item_price').each(function (index) {
        total_ = total_ + parseInt($(this).text());
    });
    $('#total_amount').text('Total: ' + total_);
    console.log(total_);
}