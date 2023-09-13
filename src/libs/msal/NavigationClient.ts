import { NavigationClient } from '@azure/msal-browser'
import router from 'next/router'

interface OptionsProps {
  noHistory: boolean;
}

export class CustomNavigationClient extends NavigationClient {
  constructor(router: object) {
    super()
    // eslint-disable-next-line
    router = router
  }

  async navigateInternal(url: String, options: OptionsProps) {
    const relativePath = url.replace(window.location.origin, '')
    if (options.noHistory) {
      router.replace(relativePath)
    } else {
      router.push(relativePath)
    }

    return false
  }
}
