variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-central-1"
}

variable "user_pool_name" {
  type        = string
  description = "The name of the userpool to be created"

  default = "challenge-app-user-pool"
}

variable "python_runtime" {
  type    = string
  default = "python3.9"
}
