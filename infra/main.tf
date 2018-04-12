provider azurerm {}

module "functionapp" {
  source    = "anoff/functionapp/azurerm"
  version   = ">=0.4.0"
  location  = "westeurope"
  name      = "smartcardsfunc"
  plan_type = "dedicated"
  version   = "beta"

  plan_settings {
    capacity = 1
    kind     = "Linux"
    size     = "S1"
  }

  site_config {
    always_on          = true
    websockets_enabled = true
  }
}
