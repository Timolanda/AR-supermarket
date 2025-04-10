%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256
from starkware.starknet.common.syscalls import get_caller_address

struct Product:
    member name : felt
    member price : Uint256
    member quantity : felt

@storage_var
func products(product_id : felt) -> (product : Product):
end

@storage_var
func loyalty_points(address : felt) -> (points : felt):
end

@external
func add_product{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    product_id : felt, name : felt, price : Uint256, quantity : felt
):
    let (caller) = get_caller_address()
    # Add owner check here
    let product = Product(name=name, price=price, quantity=quantity)
    products.write(product_id, product)
    return ()
end

@external
func purchase_product{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    product_id : felt, quantity : felt
) -> (total_price : Uint256):
    let (product) = products.read(product_id)
    assert product.quantity >= quantity

    # Calculate total price
    let total_price = Uint256(product.price.low * quantity, product.price.high * quantity)

    # Update product quantity
    let new_quantity = product.quantity - quantity
    let updated_product = Product(name=product.name, price=product.price, quantity=new_quantity)
    products.write(product_id, updated_product)

    # Add loyalty points (1 point per product purchased)
    let (caller) = get_caller_address()
    let (current_points) = loyalty_points.read(caller)
    loyalty_points.write(caller, current_points + quantity)

    return (total_price)
end

@view
func get_product{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    product_id : felt
) -> (product : Product):
    let (product) = products.read(product_id)
    return (product)
end

@view
func get_loyalty_points{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    address : felt
) -> (points : felt):
    let (points) = loyalty_points.read(address)
    return (points)
end

