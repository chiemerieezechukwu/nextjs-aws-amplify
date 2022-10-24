resource "aws_lambda_permission" "allow_cognito_invoke_pre_sign_up_lambda" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_sign_up_lambda.arn
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.challenge_app_cognito.arn
}

resource "aws_iam_role" "pre_sign_up_lambda_exec_role" {
  name = "${local.lambda_role_prefix}_pre_sign_up"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

data "aws_iam_policy_document" "lambda_basic_exec_policy_doc" {
  statement {
    effect = "Allow"

    resources = ["*"]

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
  }
}

resource "aws_iam_policy" "lambda_basic_exec_policy" {
  name   = "${local.lambda_policy_prefix}_basic_exec"
  policy = data.aws_iam_policy_document.lambda_basic_exec_policy_doc.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_exec_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_basic_exec_policy.arn
  role       = aws_iam_role.pre_sign_up_lambda_exec_role.name
}

resource "aws_iam_policy" "lambda_cognito_policy" {
  name = "${local.lambda_policy_prefix}_cognito"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action   = ["cognito-idp:ListUsers"]
      Effect   = "Allow"
      Resource = ["${aws_cognito_user_pool.challenge_app_cognito.arn}"]
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_cognito_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_cognito_policy.arn
  role       = aws_iam_role.pre_sign_up_lambda_exec_role.name
}
