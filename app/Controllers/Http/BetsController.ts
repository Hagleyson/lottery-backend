/* eslint-disable @typescript-eslint/naming-convention */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bet from 'App/Models/Bet'
import Cart from 'App/Models/Cart'
import Game from 'App/Models/Game'
import User from 'App/Models/User'

export interface choosen {
  numbers: number[]
  game_id: number
}

export interface IBetsToSave {
  choosen_numbers: string
  user_id: number
  game_id: number
  price: number
}

export default class BetsController {
  public async index({ auth, request }: HttpContextContract): Promise<Bet[]> {
    const { id } = await auth.use('api').authenticate()

    const bets = await Bet.filter(request.qs())
      .select('id', 'user_id', 'game_id', 'choosen_numbers', 'price', 'created_at')
      .where('user_id', id)
      .whereHas('type', (scope) => scope.filter(request.qs()))
      .preload('type', (scope) => scope.select('id', 'type'))

    return bets
  }

  public async create({ request, auth, response }: HttpContextContract) {
    const { id } = await auth.use('api').authenticate()
    let betData
    let betsToSave: IBetsToSave[] = []

    try {
      await User.findByOrFail('id', id)

      const { games }: { games: choosen[] } = request.only(['games'])

      const prices = games.map(async (game) => {
        const GameBase = await Game.findByOrFail('id', game.game_id)

        const nums = game.numbers

        if (nums.length > GameBase.max_number || nums.length < GameBase.max_number) {
          return response.status(400).json({
            error: {
              menssage: `This ${GameBase.type} only allows ${GameBase.max_number} numbers choosen`,
            },
          })
        }
        nums.forEach((number) => {
          if (number > GameBase.range) {
            return response.status(400).json({
              error: {
                mensage: `This game only ranges to ${number} is bigger than the maximum game range (${GameBase.range}), please choose another one`,
              },
            })
          }
        })
        const choosen_numbers = nums.join(',')

        betsToSave.push({
          choosen_numbers,
          user_id: id,
          game_id: GameBase.id,
          price: GameBase.price,
        })

        return GameBase.price
      })

      const allPrices = await Promise.all(prices)

      let totalPrice: number =
        allPrices.reduce((total: number, current: number) => {
          return total + current
        }, 0) || 0

      const cart = await Cart.query().select('min_cart_value').first()

      if (cart && totalPrice < cart?.minCartValue) {
        return response.badRequest({
          message: `The value min authorized is R$ ${cart?.minCartValue
            .toFixed(2)
            .replace('.', ',')}`,
        })
      }

      totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

      //@ts-ignore
      betData = await Bet.createMany(betsToSave)

      return response.ok({ bet: betData })
    } catch (error) {
      return response.badRequest({
        message: 'Falha ao fazer aposta',
        original_error: error.message,
      })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { betId } = request.params()
    const { gameId } = request.params()

    const bet = await Bet.findByOrFail('id', betId)

    const { choosen_nums }: { choosen_nums: number[] } = request.only(['choosen_nums'])

    const game = await Game.findByOrFail('id', gameId)

    if (choosen_nums.length > game.max_number || choosen_nums.length < game.max_number) {
      return response
        .status(400)
        .json({ error: { menssage: `This game only allows ${game.max_number} numbers choosen` } })
    }

    choosen_nums.forEach((number) => {
      if (number > game.range) {
        return response.status(400).json({
          error: {
            mensage: `This game only ranges to ${number} is bigger than the maximum game range (${game.range}), please choose another one`,
          },
        })
      }
    })
    const choosen_numbers = choosen_nums.join(',')

    const update = await bet.merge({ choosen_numbers, game_id: gameId, price: game.price })

    return update
  }

  public async delete({ request }: HttpContextContract) {
    const { betId } = request.params()
    const bet = await Bet.findByOrFail('id', betId)

    await bet.delete()
    return 'sucess'
  }
}
