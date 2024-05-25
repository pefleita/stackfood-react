import { AppBar, IconButton, styled, Typography } from '@mui/material'
import { Stack } from '@mui/system'

export const LocationView = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    flex: '1 0',
    maxWidth: '750px',
    width: '100%',
    background: theme.palette.neutral[100],
    color: theme.palette.neutral[1000],
    top: '15%',
    height: '48px',
    padding: '22px 22px 22px 0px',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
        top: '22%',
        padding: '0px 0px 0px 20px',
    },
    [theme.breakpoints.down('sm')]: {
        top: '32%',
        padding: '0px 0px 0px 20px',
        fontSize: '12px',
    },
}))
export const IconWrapper = styled(IconButton)(({ theme }) => ({
    background: theme.palette.neutral[100],
    '&:hover': {
        background: theme.palette.neutral[100],
    },
    "&.Mui-disabled": {
      background: theme.palette.neutral[200],
    }
}))

export const grayscaleMapStyles = [
    {
        elementType: 'geometry',
        stylers: [{ saturation: -80 }],
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d6e2e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#cfd4d5"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7492a8"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "lightness": 25
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#dde2e3"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#cfd4d5"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#dde2e3"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7492a8"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#dde2e3"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "saturation": -100
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#588ca4"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a9de83"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#bae6a1"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c6e8b3"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#bae6a1"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "saturation": -45
          },
          {
            "lightness": 10
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#41626b"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c1d1d6"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#a6b5bb"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#9fb6bd"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
          {
            "saturation": -70
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b4cbd4"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#588ca4"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#008cb5"
          }
        ]
      },
      {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": -5
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a6cbe3"
          }
        ]
      }
];