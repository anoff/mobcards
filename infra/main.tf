provider azurerm {}

resource "azurerm_resource_group" "smartcards" {
  name     = "smartcards"
  location = "westeurope"
}

resource "azurerm_app_service_plan" "host" {
  name                = "smartcards-host"
  location            = "${azurerm_resource_group.smartcards.location}"
  resource_group_name = "${azurerm_resource_group.smartcards.name}"

  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "host" {
  name                = "smartcards0host"
  location            = "${azurerm_resource_group.smartcards.location}"
  resource_group_name = "${azurerm_resource_group.smartcards.name}"
  app_service_plan_id = "${azurerm_app_service_plan.host.id}"
}
