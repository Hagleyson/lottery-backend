import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Game from 'App/Models/Game'

export default class CartsController {
  public async index({}: HttpContextContract) {
    let cart = await Cart.query().select('min_cart_value').first()

    const cartJSON = cart ? cart.serialize() : {}

    const games = await Game.query().select(
      'id',
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color'
    )

    cartJSON.types = games

    return cartJSON
  }
}
