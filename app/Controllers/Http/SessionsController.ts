import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class SessionsController {
  public async session({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      const user = await User.findByOrFail('email', email)
      await user.load('picture', (queryUser) => {
        queryUser
      })
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7days',
      })

      return { user, token }
    } catch (error) {
      response.unauthorized({ message: 'Senha ou e-mail inválidos' })
    }
  }
}
