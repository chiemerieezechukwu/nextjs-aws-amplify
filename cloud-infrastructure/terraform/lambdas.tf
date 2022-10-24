resource "null_resource" "install_python_dependencies_pre_sign_up" {
  triggers = {
    timestamp = timestamp()
  }

  provisioner "local-exec" {
    command = "cd ${local.root_path} && bash ${local.root_path}/scripts/package.sh"

    environment = {
      RUNTIME           = var.python_runtime
      LAMBDA_TO_PACKAGE = "pre_sign_up"
    }
  }
}


data "archive_file" "pre_sign_up_lambda_dist_pkg" {
  depends_on  = [null_resource.install_python_dependencies_pre_sign_up]
  source_dir  = "${local.dist_dir}/pre_sign_up"
  output_path = "${local.dist_zip_dir}/pre_sign_up.zip"
  type        = "zip"
}


resource "aws_lambda_function" "pre_sign_up_lambda" {
  function_name    = "${local.function_name_prefix}_pre_sign_up"
  filename         = data.archive_file.pre_sign_up_lambda_dist_pkg.output_path
  source_code_hash = data.archive_file.pre_sign_up_lambda_dist_pkg.output_base64sha256
  role             = aws_iam_role.pre_sign_up_lambda_exec_role.arn
  description      = "Pre sign up lambda function"
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.9"
  timeout          = "5"
  memory_size      = "128"
}