import { Card, CardContent, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { componentRoutes } from '../App'
import { Link as RouterLink } from 'react-router-dom'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const FunctionList = () => {
  const classes = useStyles()
  return (
    <>
      {"abc"}
      {componentRoutes.map((item, key) => {
        return (
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>
                {item.name}
              </Typography>
              <Typography variant="body2">
                <Link component={RouterLink} to={item.path as string}>
                {item.description}
                </Link>
              </Typography>
            </CardContent>
          </Card>
          )
      })}
    </>
  )
}

export default FunctionList