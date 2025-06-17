import Home from "../Screens/Home/Home";
import OCRScanner from "../Screens/OCRScanner/OCRScanner";
import Scanner from "../Screens/Scanner/Scanner";

export const routesScreen = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Scanner',
        component: Scanner
    },
    {
        name: 'ScannerOCR',
        component: OCRScanner
    }
]