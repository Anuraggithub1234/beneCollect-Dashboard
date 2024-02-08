import React from "react";
import { Typography, CardContent, Card, Stack, Grid, Box } from "@mui/material";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ConfirmDialog from "../../../../$widgets/dialog";
import {InputLabel } from '@material-ui/core';
import { ButtonPrimary, ButtonSecondary } from "../../../../$widgets/buttons/form-button";

//Styles
import { withStyles } from "@material-ui/styles";

export function html() {
  const { selectedFile, imagePreview, openLogodeletepopup } = this.state;
  const BootstrapLabel = withStyles((theme) => ({
    root: {
      fontSize: '20px !important',
      color: '#474747 !important',
      fontWeight: '450 !important'
    },
  }))(InputLabel);

  return (
    <div className={'-main'}>
      <Card>
        <CardContent >

          {selectedFile && (
            <Typography variant="h6" style={{ color: '#264d73', fontFamily: 'sans-serif', margin: '0', alignSelf: 'flex-start', marginTop: '20px' }}>
              Logo
            </Typography>
          )}

          {!selectedFile && (
            <div style={{ width: '110%', marginLeft: '-16px' }}>
              <Typography variant="h5" style={{ color: '#264d73', fontFamily: 'sans-serif', marginLeft: '30px' }}>Upload File</Typography>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>

            <div style={{ flex: 1, marginRight: '20px' }}>

              {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', marginBottom: '1rem', height: '20rem', width: '20rem ' }} />}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginTop: '20px',
                  border: selectedFile ? 'none' : '1px dotted rgb(38, 77, 115)',
                  padding: '10px',
                  marginBottom: '23px',
                  marginTop: '45px',
                  marginLeft: '20px'
                }}

                onClick={this.handleUploadClick}
              >
                {!selectedFile && (
                  <div>
                    <DriveFolderUploadOutlinedIcon
                      style={{ fontSize: '12rem', marginBottom: '1rem' }} />
                    {!selectedFile && (
                      <Typography variant="h5" style={{ color: '#264d73', fontFamily: 'sans-serif', marginBottom: '2rem', paddingLeft: '56px' }}>Browse</Typography>
                    )}
                  </div>
                )}
              </div>

              <input
                type="file"
                onChange={this.handleFileChange}
                style={{ display: 'none' }}
                ref={this.fileInputRef}
              />
            </div>
            <div></div>
          </div>

        </CardContent>
      </Card>

      <ConfirmDialog open={openLogodeletepopup} >
        <Box sx={{ width: 317, paddingLeft: '1%' }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid xs={12} mt={1}>
              <BootstrapLabel style={{ fontSize: '18px !important' }}>Are you sure you want to delete?</BootstrapLabel>
            </Grid>
            <Grid xs={12} mt={4}>
              <Stack spacing={{ xs: 1, sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                <ButtonSecondary onClick={() => this.setState({ openLogodeletepopup: false })}>Cancel</ButtonSecondary>
                <ButtonPrimary onClick={this.handleDeleteLogo}>Confirm</ButtonPrimary>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </ConfirmDialog>
    </div>
  );
}
