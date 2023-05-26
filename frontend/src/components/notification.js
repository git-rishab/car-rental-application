import { notifications } from '@mantine/notifications';

function notification(title, message, textColor, bgColor) {
    notifications.show({
        title: title || '',
        message: message || '',
        autoClose: 5000,
        withCloseButton: true,
        styles: (theme) => ({
            root: {
                backgroundColor: bgColor, // Set the background color to red
                color: textColor, // Set the text color to white
                borderColor: bgColor,
                '&::before': {
                    backgroundColor: textColor, // Set the color of the before pseudo-element to white
                },
            },

            title: { color: textColor },
            description: { color: textColor },
            closeButton: {
                color: textColor,
                '&:hover': { backgroundColor: 'darkred' }, // Set the hover background color to a darker shade of red
            },
        }),
    })
}

export {
    notification
}