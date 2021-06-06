import React, { FC, memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'animation-top' | 'animation-left' | 'animation-right' | 'animation-bottom'

type TransitionProps = {
  anmation?: AnimationName
  wrapper?: boolean
} & CSSTransitionProps

const Transition: FC<TransitionProps> = memo((props) => {
  const {
    classNames,
    anmation,
    wrapper,
    children,
    ...others
  } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : anmation}
      {...others}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
})

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
