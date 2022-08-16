import React from 'react'

interface Message {
  text: string;
}

export default function Alert({ text }: Message) {
  return (
    <div className={'alert'}>
      <strong>!</strong> {text}
    </div>
  )
}
