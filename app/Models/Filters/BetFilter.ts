/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Bet from 'App/Models/Bet'

export default class BetFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Bet, Bet>
}
