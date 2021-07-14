import { flow } from 'fp-ts/lib/function'
import { useSelector } from 'react-redux'
import { ConduktorState } from '../store/conduktor.state'
import { conduktorLens, State } from '../store/store'

export const useSafeSelector = <T>(selector: (state: ConduktorState) => T) =>
  useSelector<State, T>(flow(conduktorLens.get, selector))
