import React from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
const Tag = () => {
  const [tagsd, setTags] = React.useState(['タグ1'])

  return (
    <ReactTagInput
      placeholder='入力してください'
      tags={tagsd}
      onChange={(newTags: React.SetStateAction<string[]>) => setTags(newTags)}
    />
  )
}

export default Tag
