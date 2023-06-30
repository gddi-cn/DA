import { useAtomValue } from 'jotai'
import React from 'react'
import { selectedDeviceGroupAtom } from '../../views/SpaceDevice/store'
import { DeviceGroupOptions } from '@src/shared/types/deviceGroup'
import { message } from 'antd'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { SecondaryBtn, PrimaryBtn, PrimaryLoadingBtn } from '@src/components/Btn'
import deviceAPI from '@src/apis/device'
import DialogTransition from '@src/components/DialogTransition'
import group from "@src/asset/images/space/gen_code_group.png";
import done from "@src/asset/images/space/gen_code_done.png";
import GroupSelector from '@src/components/GroupSelector/GroupSelector'
import FlowTip from './FlowTip'

const GroupImg = styled.img`
  display: block;
  object-fit: contain;
  width: 250px;
  height: 200px;
`;

const GroupTitle = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #061926;
`;

const DoneImg = styled.img`
  display: block;
  object-fit: contain;
  width: 280px;
  height: 168px;
`;

const DoneTitle = styled.p`
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #202223;
`;

const Code = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #48a2df;
  width: 436px;
  word-break: break-all;
  margin-top: 20px;
`;

const useGenCode = () => {
  const defaultSelectedGroup = useAtomValue(selectedDeviceGroupAtom)
  const [step, setStep] = React.useState<"group" | "code">("group");
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedDeviceGroup, setSelectedDeviceGroup] =
    React.useState<DeviceGroupOptions | null>(null);
  const [code, setCode] = React.useState<string>("");

  const groupId = selectedDeviceGroup?.value;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleChange = (value?: DeviceGroupOptions) => {
    setSelectedDeviceGroup(value || null);
  };

  const handleGen = async () => {
    if (!groupId || loading) return;

    setLoading(true);
    const { success, data } = await deviceAPI.genAuthCode(groupId);
    setLoading(false);

    if (!success || !data) {
      setCode("");
      return;
    }

    setStep("code");
    setCode(data);

    try {
      await navigator.clipboard.writeText(data);
    } catch {
      message.warn("无法复制注册码，请手动复制");
    }
  };

  const handleBack = () => {
    setStep("group");
  };

  React.useEffect(() => {
    if (!open) {
      setStep("group");
    } else {
      setSelectedDeviceGroup(defaultSelectedGroup)
    }
  }, [open]);

  return {
    step,
    open,
    loading,
    code,
    handleOpen,
    handleClose,
    selectedDeviceGroup,
    handleChange,
    disableGen: !groupId && groupId !== 0,
    handleGen,
    handleBack,
  };
}

const GenCode: React.FC = () => {
  const {
    step,
    open,
    loading,
    code,
    handleOpen,
    handleClose,
    selectedDeviceGroup,
    handleChange,
    disableGen,
    handleGen,
    handleBack,
  } = useGenCode();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '8px',
      }}
    >
      <SecondaryBtn onClick={handleOpen}>
        盒子注册码
      </SecondaryBtn>
      <FlowTip />
      <Dialog
        open={open} onClose={handleClose}
        fullWidth maxWidth='md'
        TransitionComponent={DialogTransition}
        sx={{
          zIndex: 1009,
        }}
        PaperProps={{
          sx: {
            background: theme => theme.palette.blue.main,
            outline: theme => `2px solid ${theme.palette.primary.main}`,
            borderRadius: '12px',
            p: '40px 40px 16px',
          }
        }}
      >
        <DialogTitle
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            p: 0,
          }}
        >
          生成注册码
        </DialogTitle>
        <DialogContent sx={{ px: 0, height: 565, overflow: 'hidden' }}>
          <Scrollbars autoHide>
          {
            step === 'group' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: '50px'
              }}
            >
              <GroupImg src={group} alt="selecte group" />
              <GroupTitle>请选择分组</GroupTitle>
              <Box sx={{ mt: '20px' }}>
                <GroupSelector
                  value={selectedDeviceGroup}
                  onChange={handleChange}
                  width={436}
                />
              </Box>
            </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: '50px'
                }}
              >
                <DoneImg src={done} alt="done" />
                <DoneTitle>注册码生成成功，已为您粘贴到剪切板！</DoneTitle>
                <Code>{code}</Code>
              </Box>
            )
          }
          </Scrollbars>
        </DialogContent>
        <DialogActions sx={{ p: 0, columnGap: 3 }} disableSpacing>
          {
            step === 'group' ? (
              <>
                <SecondaryBtn
                  onClick={handleClose}
                  disabled={loading}
                >
                  取消
                </SecondaryBtn>
                <PrimaryLoadingBtn
                  onClick={handleGen}
                  disabled={disableGen}
                  loading={loading}
                >
                  生成
                </PrimaryLoadingBtn>
              </>
            ) : null
          }
          {
            step === 'code' ? (
              <>
                <SecondaryBtn onClick={handleBack}>
                  返回
                </SecondaryBtn>
                <PrimaryBtn onClick={handleClose}>
                  关闭
                </PrimaryBtn>
              </>
            ) : null
          }
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default GenCode
