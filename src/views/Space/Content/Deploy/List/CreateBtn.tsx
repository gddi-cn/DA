import { useCreateBtn } from './hook'
import { PrimaryBtn } from '@src/components/Button'

const CreateBtn: React.FC = () => {
  const { handleClick } = useCreateBtn()

  return (
    <PrimaryBtn width={97} onClick={handleClick}>
      新增部署
    </PrimaryBtn>
  )
}

export default CreateBtn

