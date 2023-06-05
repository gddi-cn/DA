import { Box, styled } from '@mui/material'
import React from 'react'

import MRating, { IconContainerProps } from '@mui/material/Rating';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useRating } from './hook';

const Title = styled('h2')`
  font-weight: 600;
  color: #2582c1;
  font-size: 14px;
  margin: 0;
`

const IconWrap = styled('div')`
  width: 55px;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`

const Label = styled('p')`
  font-size: 12px;
  margin: 10px 0 0;
`

const StyledRating = styled(MRating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const TipList = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  margin-top: 40px;
`

const Tip = styled('p')`
  font-size: 14px;
  font-weight: 600;
  color: #2582c1;
  text-align: center;
  margin: 0;
`

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  4: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize='large' />,
    label: '非常满意',
  },
  3: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize='large' />,
    label: '满意',
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize='large' />,
    label: '一般',
  },
  1: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize='large' />,
    label: '不满意',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  const icon = customIcons[value]?.icon;
  const label = customIcons[value]?.label;

  return (
    <IconWrap {...other}>
      {icon}
      <Label>
        {label}
      </Label>
    </IconWrap>
  )
}

const Rating: React.FC<{ timeout: number, onRating?: (value: number) => void }> = (
  {
    timeout,
    onRating,
  }
) => {
  const {
    rated,
    value,
    handleChange,
    tipList,
  } = useRating(onRating)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '20px 0',
        rowGap: '20px',
        alignItems: 'center',
      }}
    >
      <Title>您已经 {timeout} 分钟没有向我提问啦！您对我们的回答还满意吗？</Title>
      <StyledRating
        size='large'
        name='评价'
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value]?.label}
        max={4}
        value={value}
        onChange={(_, value) => handleChange(value)}
        readOnly={rated}
      />

      {
        rated ? (
          <TipList>
            {
              tipList.map((tip, idx) => (
                <Tip key={idx}>{tip}</Tip>
              ))
            }
          </TipList>
        ) : null
      }
    </Box>
  )
}

export default Rating

