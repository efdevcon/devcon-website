import React from 'react'

export default function Typography() {
  return (
    <div>
        <h1>Typography</h1>
        <br/>

        <h2>Fonts</h2>
        <p className="font-primary">Primary</p>
        <p className="font-secondary">Secondary</p>
        <p className="font-tertiary">Secondary</p>
        <br/>

        <h2>Headings</h2>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <h2>Text styles</h2>
        <p className="massive">Massive</p>
        <p className="title">Title</p>
        <p className="subtitle">Subtitle</p>
        <p className="section-header">section-header</p>
        <p className="subsection-header">subsection-header</p>
        <p>Regular paragraph</p>
        <p className="lead">Lead paragraph</p>
        <p className="text-italic">Italic</p>
        <p className="text-bold">Bold</p>
        <p className="text-small">Small</p>
        <p className="text-uppercase">Uppercase</p>
        <p className="text-lowercase">Lowercase</p>
        <p className="text-line-through">Linethrough</p>
        <p className="text-underline">Text underline</p>
        <p className="no-underline">No underline</p>

        <h2>Weights</h2>
        <p>Regular</p>
        <p className="semi-bold">Semi Bold</p>
        <p className="bold">Bold</p>
        <p className="very-bold">Extra Bold</p>

        <h2>Colors</h2>
        <p className="text-primary">Primary</p>
        <p className="text-secondary">Secondary</p>
        <p className="text-tertiary">Tertiary</p>
    </div>
  )
}