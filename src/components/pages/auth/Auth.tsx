import React, { useState } from 'react'
import style from './Auth.module.css'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../../features/userSlice'
import { auth, provider, storage } from '../../../firebase'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  Box
} from '@material-ui/core'

import EmailIcon from '@material-ui/icons/Email'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Auth: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)

  const [isLogin, setIsLogin] = useState(true)

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0])
      e.target.value = ''
    }
  }

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch(err => alert(err.message))
  }
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password)
    let url = ''
    if (avatarImage) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map(n => S[n % S.length])
        .join('')
      const fileName = randomChar + '_' + avatarImage.name

      await storage.ref(`avatars/${fileName}`).put(avatarImage)
      url = await storage
        .ref('avatars')
        .child(fileName)
        .getDownloadURL()
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url
    })
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url
      })
    )
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form className={classes.form} noValidate>
            {!isLogin && (
              <>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value)
                  }}
                />
                <Box textAlign='center'>
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize='large'
                        className={
                          avatarImage
                            ? style.login_addIconLoaded
                            : style.login_addIcon
                        }
                      />
                      <input
                        className={style.login_hiddenIcon}
                        type='file'
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                </Box>
              </>
            )}

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
            />

            <Button
              disabled={
                isLogin
                  ? !email || password.length < 6
                  : !username || !email || password.length < 6 || !avatarImage
              }
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await signInEmail()
                      } catch (err) {
                        alert(err.message)
                      }
                    }
                  : async () => {
                      try {
                        await signUpEmail()
                      } catch (err) {
                        alert(err.message)
                      }
                    }
              }
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>

            <Grid container>
              <Grid item xs>
                <span className={style.login_reset}>Forgot password ? </span>
              </Grid>
              <Grid item>
                <span
                  className={style.login_toggleMode}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Create ? ' : 'Back to Login ?'}
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={signInGoogle}
            >
              SignIn with Google
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Auth
