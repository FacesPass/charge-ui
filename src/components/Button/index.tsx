import React, { memo } from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'success' | 'warning' | 'default' | 'danger' | 'link'

//定义传入的数据类型接口
interface ButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  round?: boolean;
  children: React.ReactNode;
  href?: string;
}

//button标签上面的一些原生方法或者属性
type NativeButtonProps = ButtonProps & React.ButtonHTMLAttributes<HTMLElement>
//a标签上的一些原生方法或者属性
type AnchorButtonProps = ButtonProps & React.AnchorHTMLAttributes<HTMLElement>

//Partial可以快速把某个接口类型中定义的属性变成可选的(Optional)：
//如type ButtonProps = {className?:string, disabled?: boolean, size?: ButtonSize, ......}
export type PartialButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<PartialButtonProps> = memo((props) => {
  //这里的className是用户自定义的className
  //restProps用来接收一些其它的用户传入的参数比如onClick事件，onChange事件之类的
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    round,
    ...restProps
  } = props
  //要添加的样式类
  // btn , btn-lg, btn-primary
  //这里的className是用户自定义的className
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'round': round,
    'disabled': (btnType === 'link') && disabled //如果按钮类型是链接类型则添加上disabled样式
  })

  //如果按钮是链接类型则直接返回a标签，否则返回button标签
  if (btnType === 'link') {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
})

//设置props的默认参数
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  round: false
}

export default Button