#!/bin/bash

# test in iPhone simulator then (if that passed) Firefox
cucumber && cucumber BROWSER=firefox