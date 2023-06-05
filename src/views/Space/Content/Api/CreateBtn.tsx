import { useCreateBtn } from './hook'
import { PrimaryBtn } from '@src/components/Button'

const CreateBtn: React.FC = () => {
  const { handleClick } = useCreateBtn()

  return (
    <PrimaryBtn onClick={handleClick}>
      新增 API Key
    </PrimaryBtn>
  )
}

export default CreateBtn

