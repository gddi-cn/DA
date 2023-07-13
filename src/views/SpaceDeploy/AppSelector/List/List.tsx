import { Box, Zoom } from '@mui/material'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import Header from './Header'
import { useList } from './hook'
import AppCard from '@src/components/AppCard/AppCard'
import Footer from './Footer'

const List: React.FC = () => {
  const {
    scrollbarRef,
    appList,
    getSelect,
    handleSelectChange,
    handleDetail,
    handleScroll,
  } = useList()

  return (
    <Box
      sx={{
        py: '20px', pr: '38px',
        height: '100%', overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white.main',
          borderRadius: '8px',
          height: '100%',
          py: '20px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ px: '20px' }}>
            <Header />
          </Box>
          <Box flexGrow={1} sx={{ mt: '20px' }}>
            <Scrollbars
              autoHide
              onScrollFrame={({ top }) => handleScroll(top)}
              ref={scrollbarRef}
            >
              <Box
                sx={{
                  px: '20px',
                  display: 'grid',
                  gridTemplate: 'auto/repeat(auto-fill, minmax(276px, 1fr)) ',
                  gap: '20px',
                  pt: '2px',
                  pb: '34px',
                }}
              >
                {
                  appList.map((app, idx) => (
                    <Box key={app.id}>
                      <Zoom in style={{ transitionDelay: `${Math.min(idx * 20, 300)}ms` }}>
                        <Box>
                          <AppCard
                            {...app}
                            mutiple
                            selected={getSelect(app.id)}
                            onSelectedChange={handleSelectChange}
                            onDetail={handleDetail}
                          />
                        </Box>
                      </Zoom>
                    </Box>
                  ))
                }
                {/* <DeviceList /> */}
              </Box>
            </Scrollbars>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              px: '20px',
            }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default List
