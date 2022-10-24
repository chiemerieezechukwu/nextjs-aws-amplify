locals {
  root_path    = abspath("${path.module}/../..")
  lambdas_dir  = abspath("${path.module}/../../lambdas")
  dist_dir     = abspath("${path.module}/../../dist")
  dist_zip_dir = abspath("${path.module}/../../dist_zip")

  function_name_prefix = "${terraform.workspace}_lambda"
  lambda_role_prefix   = "${terraform.workspace}_lambda_role"
  lambda_policy_prefix = "${terraform.workspace}_lambda_policy"
}
