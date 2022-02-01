import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import moment from 'moment'
import ResetPassValidator from 'App/Validators/ResetPassValidator'
import PassValidator from 'App/Validators/PassValidator'
import { uuid } from 'uuidv4'
import User from 'App/Models/User'

export default class ResetPasswordsController {
  public async store({ request, response }: HttpContextContract) {
    const { email } = request.all()
    await request.validate(ResetPassValidator)

    try {
      const user = await User.findByOrFail('email', email)

      user.token = uuid().toString()

      user.token_created_at = new Date()

      await user.save()

      return user
    } catch (error) {
      response.notFound({ message: 'Usuário não encontrado em nossa base de dados' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { token } = request.params()

    const user = await User.findByOrFail('token', token)

    const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)
    if (tokenExpired) {
      return response.status(401).send({ error: { message: 'Opss parece que seu token expirou' } })
    }

    const { password } = request.all()

    await request.validate(PassValidator)

    user.password = password
    user.token_created_at = undefined
    user.token = undefined

    await user.save()

    return user
  }
}
