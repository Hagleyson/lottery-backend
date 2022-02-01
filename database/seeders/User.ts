import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await User.firstOrCreate({
      id: 1,
      email: 'luby@admin.com',
      password: 'secret',
      is_admin: true,
      name: 'LubyTGL',
    })
  }
}
