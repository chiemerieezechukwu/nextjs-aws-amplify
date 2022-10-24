from aws_lambda_powertools import Logger


def get_logger(service="unknown", level="INFO"):
    return Logger(
        service=service,
        level=level,
        location="function=%(module)s.%(funcName)s path=%(pathname)s:%(lineno)d pid=%(process)d tid=%(thread)d",
    )
