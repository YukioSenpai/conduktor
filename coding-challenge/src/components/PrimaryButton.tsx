import { Button } from 'antd'
import React from 'react'
import { classes, stylesheet } from 'typestyle'
import { NativeButtonProps } from 'antd/lib/button/button'

const css = stylesheet({
    button: {
        width: '100%',
        backgroundColor: '#20409A',
        color: '#fff',
        border: '1px solid #55CB91',
        borderRadius: '4px',
        fontWeight: 600,
        cursor: 'pointer',
        verticalAlign: 'middle',
        $nest: {
          '&:hover': {
            backgroundColor: '#fff',
            color: '#20409A',
          }
        }
      }
})

export const PrimaryButton = ({ className, ...props }: NativeButtonProps) => {
    return (
        <Button {...props} className={classes(css.button, className || '')} />
    )
}
