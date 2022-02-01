/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Game from 'App/Models/Game'

export default class GameFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Game, Game>

  type(type: string[]) {
    this.$query.whereIn('type', type)
  }
}
