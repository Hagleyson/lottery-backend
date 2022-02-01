import { DateTime } from 'luxon'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Bet from './Bet'
import Cart from './Cart'
import GameFilter from './Filters/GameFilter'

export default class Game extends compose(BaseModel, Filterable) {
  public static $filter = () => GameFilter

  @column()
  public type: string

  @column()
  public description: string

  @column()
  public range: number

  @column()
  public price: number

  @column()
  public max_number: number

  @column()
  public color: string

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Bet, {
    foreignKey: 'game_id',
  })
  public games: HasMany<typeof Bet>

  @belongsTo(() => Cart)
  public author: BelongsTo<typeof Cart>
}
