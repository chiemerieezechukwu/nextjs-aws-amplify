resource "aws_cognito_user_pool" "challenge_app_cognito" {
  name                     = var.user_pool_name
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length = 8
    require_lowercase = true
    require_numbers = true
    require_uppercase = true
    require_symbols = false
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true

    string_attribute_constraints {
      min_length = "1"
      max_length = "254"
    }
  }

  schema {
    attribute_data_type = "String"
    name                = "preferred_username"
    required            = true

    string_attribute_constraints {
      min_length = "1"
      max_length = "254"
    }
  }

  lambda_config {
    pre_sign_up = aws_lambda_function.pre_sign_up_lambda.arn
  }
}

resource "aws_cognito_user_pool_client" "challenge_app_cognito_client" {
  name = "challenge_app_cognito_client"

  user_pool_id                  = aws_cognito_user_pool.challenge_app_cognito.id
  prevent_user_existence_errors = "ENABLED"
}
