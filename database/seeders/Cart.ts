import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cart from 'App/Models/Cart'

export default class CartSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Cart.firstOrCreate({
      id: 1,
      minCartValue: 30,
    })
  }
}
