import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data'
import { Action } from '@ngrx/store'

export class AdditionalPersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction)
    // return a factory to get a data handler to
    // parse data from DataService and save to action.payload
    return function(data: any) {
      const action = actionHandler.call(this, data)
      if (action && data && data.content) {
        // save the data.totalElements to action.payload.totalElements
        ;(action as any).payload.totalElements = data.totalElements as number
        ;(action as any).payload.data = data.content
      }
      return action
    }
  }
}
